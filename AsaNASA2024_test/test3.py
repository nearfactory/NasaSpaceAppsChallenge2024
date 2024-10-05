import csv

comma = 0#count the number of commas
#lists for output; solution id, source if, ra, dec
list0 = ''
list1 = ''
list2 = ''
list3 = ''
#1 or 0 to allow to output or not
list0count = 0
list0count2 = 0#to remove the first three letters
list1count = 0
list2count = 0
list3count = 0

with open("./target.csv") as file_object:
    reader_object = csv.reader(file_object)
    datalist = list(reader_object)
    for i in range(1):
        for j in range(52):
            if(j == 0):
                print("solution_id : ", datalist[i][j])
            elif(j == 1):
                print("source_id : ", datalist[i][j])
            elif(j == 4):
                print("ra : ", datalist[i][j])
            elif(j == 6):
                print("dec : ", datalist[i][j])
            elif(j == 8):
                print("parallax : ", datalist[i][j])
            elif(j == 51):
                print("phot_g_mag : ", datalist[i][j])
            else:
                continue











"""
#get the necessary data and output
    for i in range(1):
        if(comma == 0):
            list0count2 = list0count2 + 1
            if(list0count2 >= 3):
                list0 = list0 + datalist[i]
        elif(comma == 1):
            if(list0count == 0):
                print("solution_id : ", list0)
                list0count = 1

        if(comma == 1):
            list1 = list1 + datalist[i]
        elif(comma == 2):
            if(list1count == 0):
                print("source_id : ", list1)
                list1count = 1

        elif(comma == 4):
            list2 = list2 + datalist[i]
        elif(comma == 5):
            if(list2count == 0):
                print("ra : ", list2)
                list2count = 1

        elif(comma == 6):
            list3 = list3 + datalist[i]
        elif(comma == 7):
            if(list3count == 0):
                print("dec : ", list3)
                list3count = 1
        if(datalist[i] == ','):
            comma = comma + 1
        elif(datalist[i] == '\\'):
            comma = -1
"""