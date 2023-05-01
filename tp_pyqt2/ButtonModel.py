from PyQt5.QtWidgets import *
from PyQt5.QtGui import *
from PyQt5 import QtGui;
from PyQt5 import QtWidgets;
from PyQt5 import QtCore;
import sys

class ButtonModel(QWidget):
    #attribution des variables
    idle = 1
    over = 2
    pressIn = 3
    pressOut = 4

    def __init__(self):
        super().__init__()
        self.state = self.idle#state initialiser a idle

    def enter(self, event):#evenement enter du shema
        if(self.state == self.idle):
            self.state = self.over
        elif(self.state == self.pressOut):
            self.state = self.pressIn

    def leave(self, event):#evenement leave du shema
        if(self.state == self.over):
            self.state = self.idle
        elif(self.state == self.pressIn):
            self.state = self.pressOut

    def press(self, event):#evenement press du shema
        if(self.state == self.over):
            self.state = self.pressIn

    def release(self, event):#evenement release du shema
        if(self.state == self.pressIn):
            self.action()
            self.state = self.over
        elif(self.state == self.pressOut):
            self.state = self.idle

    def action(self):
        print("action")