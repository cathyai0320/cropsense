import streamlit as st

from PIL import Image

st.set_page_config(
    page_title="CropSense"
)
st.title('CropSense')

def load_model(path):
    import pickle
    with open(path, 'rb') as file:
        model = pickle.load(file)
    return model
    

def generate_response(input_text):
    
    model = load_model(r'./model/gnb_best.pkl')
    n=float(input_text[0])
    p=float(input_text[1])
    k=float(input_text[2])
    temp=float(input_text[3])
    humid=float(input_text[4])
    ph=float(input_text[5])
    rainfall=float(input_text[6])

    pred = model.predict([[n,p,k,temp,humid,ph,rainfall]])
    return st.info(pred[0])
    
left_co, cent_co,last_co = st.columns(3)

with st.form('my_form'):
    result = [
        st.text_input('Nitrogen:', 90),
        st.text_input('Phosphorus:', 42),
        st.text_input('Potassium:', 43),
        st.text_input('Temperature:', 20.88),
        st.text_input('Humidity:', 82),
        st.text_input('pH:', 6.502),
        st.text_input('Rainfall:', 202.935)
    ]
    submitted = st.form_submit_button('Submit')

    generate_response(result)