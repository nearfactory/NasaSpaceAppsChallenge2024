"""import time

samplelist = '1,2,3,4,5120.45678,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30'
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

#open the csv file and separete to one letters
with open("./target.txt", "r", encoding="utf-8") as f:
    lawlist = str(f.readlines())
    datalist = list(lawlist)

#get the necessary data and output
    for i in range(400):
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
            comma = -1"""

import csv

datalist = ['123', '456', '789', '101']

with open('./toTerada.csv', 'a') as f:
    for i in range(4):
        word = datalist[i]
        words = word.split(',')
        writer = csv.writer(f)
        writer.writerow(words)