def codificar_rango_edad(rango):
    codigos = {'18-45': 1, '46-64': 2, '65+': 3}
    return codigos.get(rango.strip(), 0)

def generar_respuesta(df_usuario, entrada, models, encoders):
    edad_pred = encoders['edad'].inverse_transform([models['edad'].predict(df_usuario)[0]])[0]
    lugar_pred = encoders['lugar'].inverse_transform([models['lugar'].predict(df_usuario)[0]])[0]
    causa_pred = encoders['causa'].inverse_transform([models['causa'].predict(df_usuario)[0]])[0]

    coherencia = codificar_rango_edad(edad_pred) >= codificar_rango_edad(entrada['EDAD'])

    respuesta_conversacional = (
        f"\n🔮 Con base en tu perfil:\n"
        f"🧓 Se estima la muerte en el rango de edad: {edad_pred}\n"
        f"📍 Lugar probable del fallecimiento: {lugar_pred}\n"
        f"🩺 Causa estimada: {causa_pred}\n"
        + ("✅ Coherencia validada." if coherencia else "⚠️ Atención: predicción no coherente.")
    )

    return {
        'mensaje': respuesta_conversacional,
        'edad_estimado': edad_pred,
        'lugar_estimado': lugar_pred,
        'causa_estimado': causa_pred
    }