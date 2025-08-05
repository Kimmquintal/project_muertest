def generar_respuesta(df, entrada_raw, modelos, encoders):
    pred_edad = modelos['edad'].predict(df)[0]
    pred_causa = modelos['causa'].predict(df)[0]
    pred_lugar = modelos['lugar'].predict(df)[0]

    return {
        "edad_estimado": encoders['edad'].inverse_transform([pred_edad])[0],
        "causa_estimado": encoders['causa'].inverse_transform([pred_causa])[0],
        "lugar_estimado": encoders['lugar'].inverse_transform([pred_lugar])[0],
    }
