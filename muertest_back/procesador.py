import pandas as pd

def procesar_datos(entrada, encoders, scaler):
    df = pd.DataFrame([entrada])
    for col in df.columns:
        if col in encoders:
            df[col] = encoders[col].transform(df[col])
    df_scaled = scaler.transform(df)
    return pd.DataFrame(df_scaled, columns=df.columns)
