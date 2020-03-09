Open the file romeo.txt and read it line by line. For each line, split the line into a list of words using the split() function. The program should build a list of words. For each word on each line check to see if the word is already in the list and if not append it to the list. When the program completes, sort and print the resulting words in alphabetical order.
You can download the sample data at http://www.pythonlearn.com/code/romeo.txt
"""
#output:
#['Arise', 'But', 'It', 'Juliet', 'Who', 'already', 'and', 'breaks', 'east', 'envious', #'fair', 'grief', 'is', 'kill', 'light', 'moon', 'pale', 'sick', 'soft', 'sun', 'the', #'through', 'what', 'window', 'with', 'yonder']

fname = raw_input("Enter file name: ")
if len(fname) == 0:
    fname = 'romeo.txt'   
fh = open(fname)
lst = list()
# Iterates through each line in filehandle
for line in fh:
    #Iterates through each word on line
    for i in line.split():
        #Checks to see if word is already in list
        if not i in lst:
            #Appends words to list
            lst.append(i)
        
lst.sort()
print lst