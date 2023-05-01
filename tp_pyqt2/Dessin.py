from PyQt5.QtWidgets import *
from PyQt5.QtGui import *
from PyQt5 import QtGui;
from PyQt5 import QtCore;
import CanvasDessin
from PyQt5.Qt import QColor
from PyQt5.QtWidgets import QApplication, QWidget
from PyQt5.QtGui import QPainter, QBrush, QPen
from PyQt5.QtCore import Qt
import sys

class Dessin(QMainWindow):#etape1 exo2: mise en place de CanvasDessin + Dessin

    def __init__(self):
        super().__init__()
        self.resize(1200,800)
        self.canvasDessin = CanvasDessin.CanvasDessin()
        self.setCentralWidget( self.canvasDessin )
        self.setWindowTitle("Paintre")
        self.statusBar = QStatusBar()#etape5 exo2: creation de la toolbar
        self.setStatusBar(self.statusBar)#etape5 exo2: creation de la toolbar
        self._createMenuBar()#etape5 exo2: creation de la toolbar

    def updateIconColor(self):#etape 6 exo2: mise a jour de l'icone de couleur via fill()
        print(self.canvasDessin.color)
        self.colorIcon.fill(self.canvasDessin.color)
        self.colorIconImg = QIcon(self.colorIcon)#etape 6 exo2: mise a jour de l'icone de couleur avec QIcon
        self.colorIconImg.pixmap = self.colorIcon
        self.changeColorAct.setIcon(self.colorIconImg)

    def _createMenuBar(self):
        menuBar = self.addToolBar("options")#etape5 exo2: creation de la toolbar

        self.colorIcon = QtGui.QPixmap(30, 30)#etape 6 exo2: mise a jour de l'icone de couleur avec QpixMap
        self.colorIcon.fill(QColor(255, 0, 0))
        self.colorIconImg = QIcon(self.colorIcon)#etape 6 exo2: mise a jour de l'icone de couleur avec QIcon
        self.colorIconImg.pixmap = self.colorIcon


        self.changeColorAct = QAction(self.colorIconImg, "Color", self )#etape5 exo2: le QAction de type QColorDialog qui ouvre une fenetre de choix de couleur
        self.updateIconColor()
        self.changeColorAct.setShortcut("Ctrl+K")
        self.changeColorAct.setToolTip("Change color")
        self.changeColorAct.setStatusTip("Change color")
        self.changeColorAct.triggered.connect(self.changeColor)
        menuBar.addAction(self.changeColorAct)

        self.sl = QSlider(Qt.Horizontal)#etape5 exo2:un curseur via QSlider qui permet de regler l'epaisseur du trait, son min, son max, sa valeur par defaut
        self.sl.setMinimum(5)
        self.sl.setMaximum(50)
        self.sl.setValue(20)
        self.sl.setTickPosition(QSlider.TicksBelow)
        self.sl.setTickInterval(5)
        self.sl.valueChanged.connect(self.changeWidth)
        menuBar.addWidget(self.sl)

        resetAct = QPushButton("&Reset")#etape5 exo2:le bouton de reset pour effacer le canvas avec la fonction reset() defini dans CanvasDessin
        resetAct.clicked.connect(self.reset)
        menuBar.addWidget(resetAct)

    def changeColor(self):#etape5 exo2: permet le changement de couleur
        color = QColorDialog.getColor()
        self.canvasDessin.setColor(color)
        self.updateIconColor()#etape 6 exo2: mise a jour de l'icone de couleur avec la fonction defini precedement

    def changeWidth(self):#etape5 exo2: change l'epaisseur du trait selon le curseur
        width = self.sl.value()
        self.canvasDessin.setWidth(width)

    def reset(self):#etape5 exo2: herité de CanvasDessin
        self.canvasDessin.reset()

def main():#etape1 exo2: mise en place de CanvasDessin + Dessin
    app = QApplication(sys.argv)
    d = Dessin()
    d.show()
    app.exec()
    
if __name__ == "__main__":#etape1 exo2: mise en place de CanvasDessin + Dessin
    main()