import gzip
import shutil

source_file = "./GaiaSource_000-000-000.csv.gz"
target_file = "./target.txt"

with gzip.open(source_file, mode="rb") as gzip_file:
    with open(target_file, mode="wb") as decompressed_file:
        shutil.copyfileobj(gzip_file, decompressed_file)