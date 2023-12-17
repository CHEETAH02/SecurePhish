import Levenshtein
import requests
from bs4 import BeautifulSoup

class CodeSimilarity:
    def __init__(self,URL1,URL2) :
         self.URL1 = URL1
         self.URL2 = URL2
          
    def compare_html_dom(self):
            try:
                response1 = requests.get(self.URL1)
                response1.raise_for_status()  # Check if the request was successful
                html_content1 = response1.text
                soup1 = BeautifulSoup(response1.text, 'html.parser')
                unique_tags1 = set(tag.name for tag in soup1.find_all())
                tag_contents1 = {}

                for tag in soup1.find_all():
                    tag_contents1[tag.name] = tag.get_text()
                
                response2 = requests.get(self.URL2)
                response2.raise_for_status()  # Check if the request was successful
                html_content2 = response2.text
                soup2 = BeautifulSoup(response2.text, 'html.parser')
                unique_tags2 = set(tag.name for tag in soup2.find_all())
                tag_contents2 = {}

                for tag in soup2.find_all():
                    tag_contents2[tag.name] = tag.get_text()
                
                similar_tags = []
                total_scr = 0

                for tag1 in unique_tags1:
                    for tag2 in unique_tags2:
                        if tag1 == tag2 and tag_contents1[tag1]!="" and tag_contents2[tag2]!="":
                            similar_tags.append(tag1)
                            total_scr += self.code_content_similarity(tag_contents1[tag1],tag_contents2[tag1])
                
                total_scr = total_scr /len(similar_tags)
                return total_scr
            except requests.exceptions.RequestException as e:
                print(f"Error: {e}")
                return 0

    def code_content_similarity(self,content1, content2):
            # Calculate Levenshtein distance
            distance = Levenshtein.distance(content1, content2)

            # Calculate similarity ratio
            min_length = min(len(content1),len(content2))
            max_length = max(len(content1), len(content2))
            similarity_ratio = (max_length-distance) / min_length

            return similarity_ratio * 100