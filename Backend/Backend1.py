from flask import Flask, jsonify, request
from flask_cors import CORS
import joblib
import pandas as pd
from urllib.parse import quote_plus
from pymongo.mongo_client import MongoClient
from FeatureExtraction import FeatureExtraction
from PictureSimilarity import PictureSimilarity
from CodeSimilarity import CodeSimilarity
from Models import Models

app = Flask(__name__)
CORS(app)
username = quote_plus('SIH_user')
password = quote_plus('chakDeIndia@2023')
uri = "mongodb+srv://%s:%s@cluster0.3fajycc.mongodb.net/?retryWrites=true&w=majority" % (
    username, password)
client = MongoClient(uri)
db = client['HackathonDB']
collection = db['URLs']


@app.route('/Predict', methods=['POST'])
def Predict():
    if request.is_json:
        try:
            data = request.get_json()
            print(data)
            url = data['url']
            # row = collection.find_one({'url': url})
            # recent = collection.find().sort({'_id':-1}).limit(10)
            # result = [{'url': x['url'], 'result': x['result']} for x in recent]
            # print(result)
            # if row:
            #     result = row['result']
            #     return jsonify({"ok": True, "detectionResult": result, "score": 0.9}), 200
            PictureSimilarityResult,websites_to_check = PictureSimilarity(url).getSimilarity()
            if PictureSimilarityResult == 0 :
                return jsonify({"ok": True, "detectionResult": 0, "score": PictureSimilarityResult, "type":"Picture Similarity"}), 200
            
            if PictureSimilarityResult <15 :
                return jsonify({"ok": True, "detectionResult": 1, "score": PictureSimilarityResult, "type":"Picture Similarity"}), 200
            
            
            print(PictureSimilarityResult,websites_to_check)

            CodeSimilarityResult = 0

            for website in websites_to_check :
                CodeSimilarityResult = max(CodeSimilarityResult,CodeSimilarity(website,url).compare_html_dom())
                print(CodeSimilarityResult)
            
            if CodeSimilarityResult>90:
                return jsonify({"ok": True, "detectionResult": 1, "score": CodeSimilarityResult, "type":"Code Similarity"}), 200
            
            Sample = FeatureExtraction(url).getFeatures()
            print(Sample)
            # df = pd.DataFrame([Sample], columns=['Prefix_suffix_separation', 'Sub_domains', 'URL_Length', 'age_domain',
            #                   'dns_record', 'domain_registration_length', 'statistical_report', 'tiny_url', 'slashes', 'dots'])

            score,result = Models(Sample).getResults()
            print(score,result)
            
            # collection.insert_one({'url': url, 'result': int(prediction[0])})

            return jsonify({"ok": True, "detectionResult": result, "score": score, "type":"Model Evaluation"}), 200
        except Exception as e:
            print(e)
            return jsonify({"ok": False, "detectionResult": 0, "score": 0}), 400
    else:
        print("hello")
        return jsonify({"ok": False, "detectionResult": 0, "score": 0}), 400

@app.route("/recenturls")
def recentURLs():
    recent = collection.find().sort({'_id':-1}).limit(10)
    response = []
    for x in recent:
        url = x['url']
        if x['result'] == 0:
            response.append({'url': url, 'result': 'clean'})
        else:
            response.append({'url': url, 'result': 'suspicious'})
    return response

if __name__ == "__main__":
    app.run(debug=True)