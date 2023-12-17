from io import BytesIO
from difflib import SequenceMatcher
import Levenshtein
import pandas as pd
import re
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from PIL import Image
from PIL import Image
import imagehash
import Levenshtein


class PictureSimilarity:
    def __init__(self,URL):
     self.URL = URL
     self.df = pd.read_csv("./top10milliondomains-edited.csv")
     self.key_words = []
     self.domain = ""
     self.cnt = 0
     self.websites_to_check = []
     self.domain = URL.split("/")[2]
     print(self.domain)
     self.key_words = re.split('[.;-]',self.domain)
     print("key words present in url : ",self.key_words)
     self.Domain_names = self.df[["Domain","Open Page Rank"]]
     self.key_words_length = len(self.key_words)
     
    def domain_similarity(self,str1, str2):
        # Create a SequenceMatcher object with the input strings
        seq_matcher = SequenceMatcher(None, str1, str2)

        # Get the matching blocks, where a block is represented as a tuple (i, j, n)
        # i: start index in str1, j: start index in str2, n: length of the match
        matching_blocks = seq_matcher.get_matching_blocks()

        # Extract the longest common subsequence from the matching blocks
        lcs = ''.join(str1[i:i+n] for i, j, n in matching_blocks)
        
        distance = Levenshtein.distance(str1, str2)

        # Calculate similarity ratio
        max_length = max(len(str1), len(str2))
        similarity_percentage = ((max_length-distance) / max_length)*100

        return (len(lcs)/min(len(str1),len(str2)))*100 + similarity_percentage
    
    def getSimilarity(self):
        potential_domains = []
        for index,row in self.Domain_names.iterrows():
            domain_parts = row['Domain'].split(".")
            avg_scr = 0
            highest_scr = 0
            for i in range(len(self.key_words)-1):
                highest_scr = 0
                for j in range(len(domain_parts)-1):
                    similarity_percentage = self.domain_similarity(self.key_words[i], domain_parts[j])
                    highest_scr = max(highest_scr,similarity_percentage)
                avg_scr = max(avg_scr,highest_scr)
            potential_domains.append((avg_scr*int(row['Open Page Rank']),row['Domain']))


        sorted_potential_domains = sorted(potential_domains, key=lambda x: x[0],reverse=True)
        print(sorted_potential_domains[0][0],sorted_potential_domains[0][1])

        
        websites_to_check = []
        found = False

        for domain in sorted_potential_domains:
            
            url = "https://www."+domain[1]+"/"
            if url != self.URL:
                websites_to_check.append(url)
            elif url == self.URL:
                found = True
        
        try:
            if found == False:
                Len = len(websites_to_check)
                Image1 = self.take_screenshot(self.URL)
                H1 = self.calculate_image_hash(Image1)
                if Len == 1:
                    print("Websites with 90 percent or more domain name similarity:",[websites_to_check[0]])
                    Image2 = self.take_screenshot(websites_to_check[0])
                    H2 = self.calculate_image_hash(Image2)
                    return self.compare_image_hashes(H1,H2),websites_to_check[:1]
                elif Len == 2:
                    print("Websites with 90 percent or more domain name similarity:",[websites_to_check[0],websites_to_check[1]])
                    Image2 = self.take_screenshot(websites_to_check[0])
                    Image3 = self.take_screenshot(websites_to_check[1])
                    H2 = self.calculate_image_hash(Image2)
                    H3 = self.calculate_image_hash(Image3)
                    return min(self.compare_image_hashes(H1,H2),self.compare_image_hashes(H1,H3)),websites_to_check[:2]
                elif Len >=3:
                    print("Websites with 90 percent or more domain name similarity:",[websites_to_check[0],websites_to_check[1],websites_to_check[2]])
                    Image2 = self.take_screenshot(websites_to_check[0])
                    Image3 = self.take_screenshot(websites_to_check[1])
                    Image4 = self.take_screenshot(websites_to_check[2])
                    H2 = self.calculate_image_hash(Image2)
                    H3 = self.calculate_image_hash(Image3)
                    H4 = self.calculate_image_hash(Image4)
                    return min(self.compare_image_hashes(H1,H2),min(self.compare_image_hashes(H1,H3),self.compare_image_hashes(H1,H4))),websites_to_check[:3]
            else :
                print("Original websites")
                return 0,[] # It is original website
        except BaseException as e:
            print(e)
            return 16,[]
    def take_screenshot(self,url):
        chrome_options = Options()
        chrome_options.add_argument("--headless")  # Run Chrome in headless mode (no GUI)
        # chrome_options.add_argument("--disable-gpu")  # Disable GPU acceleration for headless mode

        driver = webdriver.Chrome(options=chrome_options)

        try:
            # Open the URL
                driver.get(url)
                WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.TAG_NAME, 'body')))
                # Take a screenshot
                screenshot_bytes = driver.get_screenshot_as_png()
                print(type(screenshot_bytes))
                image = Image.open(BytesIO(screenshot_bytes))
                jpg_bytes_io = BytesIO()
                image.convert("RGB").save(jpg_bytes_io, format="JPEG")
                # Now you can work with the 'jpg_bytes_io' variable, for example, display it or process it further
                # Example: Display the JPG image
                # driver.save_screenshot("./screenshot"+str(i+1)+".jpg")
                # print("Screenshot saved to screenshot"+str(i+1)+".jpg")
                return image
        finally:
            # Close the browser
            driver.quit()

    def calculate_image_hash(self,image):
        hash_value = imagehash.average_hash(image)
        return hash_value

    def compare_image_hashes(self,hash1, hash2):
        return hash1 - hash2