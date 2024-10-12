
from flask import Flask ,request,jsonify
from flask_cors import CORS

import util
app=Flask(__name__)

@app.route('/get_location_names')

def get_location_names():
    response=jsonify({
        'location':util.get_location_names()
    })
    response.headers.add('Access-control-Allow-Origin','*')
    return response

@app.route('/predict_home_price',methods=['POST'])

def predict_home_price():
    total_sqft=float(request.form['total_sqft'])
    location=request.form['location']
    bhk=int(request.form['bhk'])
    bath=int(request.form['bath'])
    balcony=int(request.form['balcony'])

    response=jsonify({
        'estimated_price':util.predict_home_price(total_sqft,location,bhk,bath,balcony)
    })
    response.headers.add('Access-control-Allow-Origin','*')
    return response

if __name__=="__main__":
    print("Starting Flask Server for house price prediction")
    app.run()