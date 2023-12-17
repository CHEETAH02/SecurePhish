import joblib
import numpy as np

class Models:

    def __init__(self, feature_array):
        self.feature = feature_array
        self.result = []
        self.random_forest_classifier()
        self.xgboost_classifier()
        # self.adaboost_classifier()
        self.svm_classifier()
        self.logistic_regression_classifier()

    def random_forest_classifier(self):

        forest_model = joblib.load('rf_model.joblib')
        self.result.append(forest_model.predict(self.feature)[0])

    def xgboost_classifier(self):

        xgboost_model = joblib.load('xgboost_model.joblib')
        self.result.append(xgboost_model.predict(self.feature)[0])
        

    def adaboost_classifier(self):

        adaboost_model = joblib.load('adaboost_model.joblib')
        self.result.append(adaboost_model.predict(self.feature)[0])

    def svm_classifier(self):

        svm_model = joblib.load('svc_model.joblib')
        self.result.append(svm_model.predict(self.feature)[0])

    def logistic_regression_classifier(self):

        lr_model = joblib.load('logistic_model.joblib')
        self.result.append(lr_model.predict(self.feature)[0])
    
    def getResults(self):
        score = np.average(self.result)
        result = np.round(score)
        return score,result
