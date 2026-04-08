from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here

@api_view(['POST'])
def convert_units(request):
    value = float(request.data.get('value'))
    if value is None: 
        return Response({"error": "Value is required"}, status=400)
    value = float(value)
    from_unit = request.data.get('from_unit')
    to_unit = request.data.get('to_unit')
    category = request.data.get('category')

    result = convert(value, from_unit, to_unit, category)

    return Response({"result": result})

def convert(value, from_unit, to_unit, category):
    # length conversion to meters
    length = {
        "milimeter": 0.001,
        "centimeter": 0.01,
        "meter" : 1,
        "kilometer": 1000,
        "inch": 0.0254,
        "foot": 0.3048,
        "yard": 0.9144,
        "mile": 1609.34
    }

    #weight conversion to grams
    weight = {
        "milligram": 0.001,
        "gram" : 1,
        "kilogram": 1000,
        "ounce": 28.3495,
        "pound": 453.592
    }

    if category == "length":
        return value * length[from_unit] / length[to_unit]
    
    elif category == "weight":
        return value * weight[from_unit] / weight[to_unit]
    
    elif category == "temperature":
        #convert to celcius first
        if from_unit == "fahrenheit":
            value = (value - 32) * 5/9
        elif from_unit == "kelvin":
            value = value - 273.15

        #convert from celcius to target
        if to_unit == "fahrenheit":
            return value * 9/5 + 32
        elif to_unit == "kelvin":
            return value + 273.15
        else:
            return value