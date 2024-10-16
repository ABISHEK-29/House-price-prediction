import json
import pickle
import numpy as np

__location=None
__data_columns=None
__model=None

def predict_home_price(sqft,location,bhk,bath,balcony):
    load_saved_artifacts()
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index=-1

    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = balcony
    x[3] = bhk
    if loc_index >= 0:
        x[loc_index] = 1
    return round(__model.predict([x])[0],2)

def get_location_names():
    load_saved_artifacts()
    return __location

def load_saved_artifacts():
    print("loading saved artifacts")
    global __data_columns
    global __location
    global __model
    with open("./artifacts/columns.json",'r') as f:
        __data_columns=json.load(f)['data_columns']
        __location=__data_columns[4:]
    with open("./artifacts/bangalore_home_prices_model.pickle","rb") as f:
        __model=pickle.load(f)



if __name__=="__main__":
    print(get_location_names())
    print(predict_home_price(1000,'1st Phase JP Nagar',2,2,0))
    print((predict_home_price(1500,'KR Puram',3,2,2)))
    print(predict_home_price(1000,'Kalkere',3,2,1))