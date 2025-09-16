from docx import Document
import pandas as pd

doc = Document("archivo.docx")
data = []

for para in doc.paragraphs:
    text = para.text.strip()
    if text:
        data.append([text])

df = pd.DataFrame(data, columns=["Contenido"])
df.to_excel("contenido_extraido.xlsx", index=False)
