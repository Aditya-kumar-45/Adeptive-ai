import google.generativeai as genai

# 👉 Replace with your ACTUAL API KEY
genai.configure(api_key="AIzaSyC9309GYGmAP4OcSxGJJBw7YxVH6gmNKVk")

print("🔍 Searching for available Gemini models...")
print("-" * 40)

for m in genai.list_models():
    if 'generateContent' in m.supported_generation_methods:
        print(f"✅ Use this exact name: {m.name}")