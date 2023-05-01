from PyQt5.QtWidgets import *
from PyQt5.QtGui import *
from PyQt5 import QtGui;
from PyQt5 import QtCore;
import ButtonModel
from PyQt5.Qt import QColor
from PyQt5.QtWidgets import QApplication, QWidget
from PyQt5.QtGui import QPainter, QBrush, QPen
from PyQt5.QtCore import Qt
import sys

class CanvasButton(QWidget):#etape1-2 mise en place du point d'entré + de la classe CanvasButton  
    def __init__(self):#Initialisation des variable de mouvement de souris + des couleur de l'ellipse en fonction de ces derniers
        super().__init__()
        self.bbox = QtCore.QRect(0, 0, self.width() - 1, self.height() - 1)
        self.defaultCol = QtGui.QColor('grey')
        self.hoverCol = QtGui.QColor('violet')
        self.pressCol = QtGui.QColor('red')
        self.cursorOver = False
        self.model = ButtonModel.ButtonModel()#etape 4: Synchro de CanvasButton et ButtonModel
        self.setMouseTracking(True)

    def mousePressEvent(self, event):#Evenement pour le click souris 
        print("mouse Press")
        self.model.press(event)
        super().mousePressEvent(event)
        self.update()

    def cursorOnEllipse(self, point):#quand le curseur est sur l'ellipse, permet l'ajout d'evenement relier a ça
        if(self.bbox.contains(point)):
            return True
        else:
            return False

    def mouseMoveEvent(self, event):#Evenement pour le mouvement de la souris sur l'ellipse, un pour l'entré dessus, un pour la sortie
        print("mouse move")
        super().mouseMoveEvent(event)
        self.cursorOver = (self.cursorOnEllipse(event.pos()))
        if(self.cursorOver):  
            self.model.enter(event)
        else:
            self.model.leave(event)
        self.update()

    def mouseReleaseEvent(self, event):#Evenement pour le "déclick" de la souris, quand on relache le click
        print("release move")
        self.model.release(event)
        super().mouseReleaseEvent(event)
        self.update()
    
    def paintEvent(self, event):#permet de colorier l'ellipse en fonction des evenement de la souris 
        painter = QPainter(self)
        painter.setRenderHint(QPainter.Antialiasing, True);
        currentColor = self.defaultCol

        if(self.model.state == 2):
            currentColor = self.hoverCol
        elif(self.model.state == 3):
            currentColor = self.pressCol

        painter.setPen(QPen(currentColor, 12, Qt.SolidLine));
        painter.setBrush(QBrush(currentColor, Qt.SolidPattern));
        painter.drawEllipse(self.bbox);

class MainWindow(QMainWindow):#Initialisation de la fenetre ou va se passer l'exemple de dessin

    def __init__(self):
        super().__init__()
        self.resize(1200,800)
        self.canvasBtn = CanvasButton()
        self.setCentralWidget( self.canvasBtn )
        self.setWindowTitle("Drawing Example")

def main(): #etape1-2 mise en place du point d'entré + de la classe CanvasButton
    app = QApplication(sys.argv)
    w = MainWindow()
    w.show()
    app.exec()
    
if __name__ == "__main__": #etape1-2 mise en place du point d'entré + de la classe CanvasButton
    main()