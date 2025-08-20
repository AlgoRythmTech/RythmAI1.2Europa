import os
import subprocess

def download_math_dataset():
    if not os.path.exists("math"):
        print("Cloning Hendrycks MATH dataset...")
        subprocess.run(["git", "clone", "https://github.com/hendrycks/math.git"])
    else:
        print("MATH dataset already exists.")

if __name__ == "__main__":
    download_math_dataset()
