import requests
import dns.resolver
import certifi
import ssl
import socket
from urllib.parse import urlparse, urljoin
import whois
from bs4 import BeautifulSoup
from datetime import date
import re
import tldextract
import numpy as np

class FeatureExtraction:
    def __init__(self, url):
        self.url = url
        self.feature = []
        # self.check_dns_records()
        self.age_of_domain_sub()
        self.verify_ssl_certificate()
        self.curr_age()
        self.check_for_forwarding()
        self.check_external_links()
        self.long_url()
        self.short_url()
        self.symbol()
        self.redirecting()
        self.prefix_suffix()
        self.non_standard_port()
        self.subdomains()
        self.https()
        self.ipaddress()
        self.is_abnormal_url()
        self.has_multi_subdomains()
        self.has_sensitive_words()
        self.check_non_standard_ports()

    # dns

    def check_dns_records(self):
        a = []
        try:
            parsed_url = urlparse(self.url)
            domain = parsed_url.netloc

            result = dns.resolver.resolve(domain, "A")
            for ip_address in result:
                a.append(ip_address)
            if len(a) <= 1:
                self.feature.append(0)
            else:
                self.feature.append(1)

        except Exception as e:
            print(e)
            self.feature.append(-1)

    # age of domain
    def age_of_domain_sub(self):
        try:
            urlpars = urlparse(self.url)
            domain = urlpars.netloc
            domain_name = whois.whois(domain)
            creation_date = domain_name.creation_date
            expiration_date = domain_name.expiration_date

            if (expiration_date is None) or (creation_date is None):
                self.feature.append(-1)
                return

            if type(expiration_date) is list:
                date1 = expiration_date[0]
            else:
                date1 = expiration_date

            if type(creation_date) is list:
                date2 = creation_date[0]
            else:
                date2 = creation_date

            ageofdomain = abs((date1 - date2).days)
            if (ageofdomain / 30) < 12:
                self.feature.append(1)
            else:
                self.feature.append(0)
        except Exception as e:
            print(e)
            self.feature.append(-1)

    # ssl
    def verify_ssl_certificate(self):
        try:
            urlpars = urlparse(self.url)
            domain = urlpars.netloc
            context = ssl.create_default_context(cafile=certifi.where())

            with socket.create_connection((domain, 443), timeout=2) as sock:
                with context.wrap_socket(sock, server_hostname=domain) as ssock:
                    ssock.do_handshake()
                    cert = ssock.getpeercert()
                    self.feature.append(0)
        except Exception as e:
            print(e)
            self.feature.append(1)

    # curr_age
    def curr_age(self):
        try:
            urlpars = urlparse(self.url)
            domain = urlpars.netloc
            domain_name = whois.whois(domain)
            creation_date = domain_name.creation_date
            todays = date.today()
            if type(creation_date) is list:
                cr_date = creation_date[0]
            else:
                cr_date = creation_date
            age = (todays.year - cr_date.year) * 12 + (todays.month - cr_date.month)
            if age >= 12:
                self.feature.append(0)
            else:
                self.feature.append(1)
        except Exception as e:
            print(e)
            self.feature.append(-1)

    # forwarding
    # def check_for_forwarding(self):
    #     try:
    #         response = requests.get(self.url, timeout=1)
    #         response.raise_for_status()
    #         soup = BeautifulSoup(response.text, "html.parser")

    #         # Check for meta-refresh tags
    #         meta_refresh_tags = soup.find_all(
    #             "meta", attrs={"http-equiv": "refresh"})

    #         if meta_refresh_tags:
    #             self.feature.append(1)
    #         else:
    #             self.feature.append(0)
    #     except Exception as e:
    #         print(e)
    #         self.feature.append(-1)

    def check_for_forwarding(self):
        try:
            response = requests.get(self.url)
            if len(response.history) <= 1:
                self.feature.append(0)
            elif len(response.history) <= 4:
                self.feature.append(-1)
            else:
                self.feature.append(1)
        except Exception as e:
            print(e)
            self.feature.append(-1)

    # check_link
    def is_external_link(self, base_url, link):
        base_domain = tldextract.extract(base_url).domain
        link_domain = tldextract.extract(link).domain
        return base_domain != link_domain

    def check_external_links(self):
        try:
            response = requests.get(self.url, timeout=2)
            response.raise_for_status()

            html_text = response.text
            soup = BeautifulSoup(html_text, "html.parser")

            base_url = response.url  # Get the base URL after any redirects

            # Find all 'a' tags with 'href' attribute
            anchor_tags = soup.find_all("a", href=True)

            # Check if each link is external
            external_links = [
                a["href"]
                for a in anchor_tags
                if self.is_external_link(base_url, urljoin(base_url, a["href"]))
            ]
            print(external_links)

            if external_links != []:
                self.feature.append(1)
            else:
                self.feature.append(0)
        except Exception as e:
            print(e)
            self.feature.append(-1)

    # long_url
    def long_url(self):
        if len(self.url) < 54:
            self.feature.append(0)
            return
        if len(self.url) >= 54 and len(self.url) <= 75:
            self.feature.append(-1)
            return
        self.feature.append(1)

    # short_url
    def short_url(self):
        match = re.search(
            "bit\.ly|goo\.gl|shorte\.st|go2l\.ink|x\.co|ow\.ly|t\.co|tinyurl|tr\.im|is\.gd|cli\.gs|"
            "yfrog\.com|migre\.me|ff\.im|tiny\.cc|url4\.eu|twit\.ac|su\.pr|twurl\.nl|snipurl\.com|"
            "short\.to|BudURL\.com|ping\.fm|post\.ly|Just\.as|bkite\.com|snipr\.com|fic\.kr|loopt\.us|"
            "doiop\.com|short\.ie|kl\.am|wp\.me|rubyurl\.com|om\.ly|to\.ly|bit\.do|t\.co|lnkd\.in|"
            "db\.tt|qr\.ae|adf\.ly|goo\.gl|bitly\.com|cur\.lv|tinyurl\.com|ow\.ly|bit\.ly|ity\.im|"
            "q\.gs|is\.gd|po\.st|bc\.vc|twitthis\.com|u\.to|j\.mp|buzurl\.com|cutt\.us|u\.bb|yourls\.org|"
            "x\.co|prettylinkpro\.com|scrnch\.me|filoops\.info|vzturl\.com|qr\.net|1url\.com|tweez\.me|v\.gd|tr\.im|link\.zip\.net",
            self.url,
        )
        if match:
            self.feature.append(1)
        else:
            self.feature.append(0)

    # symbol
    def symbol(self):
        if re.findall("@", self.url):
            self.feature.append(1)
        else:
            self.feature.append(0)

    # redirecting
    def redirecting(self):
        if self.url.rfind("//") > 6:
            self.feature.append(1)
        else:
            self.feature.append(0)

    # prefix_suffix
    def prefix_suffix(self):
        try:
            urlpars = urlparse(self.url)
            domain = urlpars.netloc
            match = re.findall("\-", domain)
            if match:
                self.feature.append(1)
            else:
                self.feature.append(0)
        except Exception as e:
            print(e)
            self.feature.append(-1)

    # non_standard_port
    def non_standard_port(self):
        try:
            urlpars = urlparse(self.url)
            domain = urlpars.netloc
            port = domain.split(":")
            if len(port) > 1:
                self.feature.append(1)
            else:
                self.feature.append(0)
        except Exception as e:
            print(e)
            self.feature.append(-1)

    # subdomains
    def subdomains(self):
        try:
            urlpars = urlparse(self.url)
            domain = urlpars.netloc
            dot_count = domain.count(".")
            if dot_count == 1 or dot_count == 2:
                self.feature.append(0)
            else:
                self.feature.append(1)
        except Exception as e:
            print(e)
            self.feature.append(-1)

    # Https
    def https(self):
        try:
            parsed_url = urlparse(self.url)
            if parsed_url.scheme == "https":
                self.feature.append(0)
            else:
                self.feature.append(1)
        except Exception as e:
            print(e)
            self.feature.append(-1)

    # ip
    def ipaddress(self):
        ipv4_pattern = r"\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b"
        ipv6_pattern = r"\b(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}\b"
        ipv4_addresses = re.findall(ipv4_pattern, self.url)
        ipv6_addresses = re.findall(ipv6_pattern, self.url)
        if ipv4_addresses or ipv6_addresses:
            self.feature.append(1)
        else:
            self.feature.append(0)

    # abnormal
    def is_abnormal_url(self):
        parsed_url = urlparse(self.url)
        subdomains = parsed_url.netloc.split(".")
        if len(subdomains) > 3:
            self.feature.append(1)
        else:
            self.feature.append(0)

    # msdomains
    def has_multi_subdomains(self):
        parsed_url = urlparse(self.url)
        subdomains = parsed_url.netloc.split(".")

        # Consider the URL phishing-prone if it has more than 2 subdomains
        if len(subdomains) > 3:
            self.feature.append(1)
        else:
            self.feature.append(0)

    # swords
    def has_sensitive_words(self):
        sensitive_words = [
            "confirm",
            "account",
            "banking",
            "secure",
            "ebyisapi",
            "webscr",
            "signin",
            "mail",
            "install",
            "toolbar",
            "backup",
            "paypal",
            "password",
            "username",
            "phishing",
            "malicious",
            "attack",
            "hacked",
            "fraud",
        ]

        # Convert the URL to lowercase for case-insensitive matching
        url = str(self.url).lower()
        for word in sensitive_words:
            if word in url:
                self.feature.append(1)
                return
        self.feature.append(0)

    # nsport
    def has_non_standard_port(self, url):
        parsed_url = urlparse(url)
        return parsed_url.port and parsed_url.port not in {80, 443}

    def check_non_standard_ports(self):
        try:
            response = requests.get(self.url, timeout=2)
            response.raise_for_status()

            html_text = response.text
            soup = BeautifulSoup(html_text, "html.parser")

            # Find all 'a' tags with 'href' attribute
            anchor_tags = soup.find_all("a", href=True)

            # Check if each link has a non-standard port
            links_with_non_standard_ports = [
                a["href"] for a in anchor_tags if self.has_non_standard_port(a["href"])
            ]

            if links_with_non_standard_ports:
                self.feature.append(1)
            else:
                self.feature.append(0)

        except Exception as e:
            print(e)
            self.feature.append(-1)
    
    def getFeatures(self):
        return np.array(self.feature).reshape(1,-1)