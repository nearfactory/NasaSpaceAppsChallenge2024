import csv

def CSVWRITE(i, j):
    data = datalist[i][j]
    with open("./onlyids5.txt", "a") as file:
        file.write(data)
        file.write(",")
    return

def CSVWRITE_withBREAK(i, j):
    data = datalist[i][j]
    with open("./onlyids5.txt", "a") as file:
        file.write(data)
        file.write("\n")
    return

with open("./target5.csv") as file_object:
    reader_object = csv.reader(file_object)
    datalist = list(reader_object)
    for i in range(40000):
        for j in range(52):
            # if(j == 0):#solution_id
            #     CSVWRITE(i, j)
            if(j == 1):#source_id
                CSVWRITE(i, j)
            #     print(datalist[i][j])
            # if(j == 4):#ra
            #     CSVWRITE(i, j)
            # if(j == 6):#dec
            #     CSVWRITE(i, j)
            # if(j == 8):#parallax
            #     CSVWRITE(i, j)
            # if(j == 51):#phot_g_mean_mag
            #     CSVWRITE_withBREAK(i, j)