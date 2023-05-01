from PyQt5.QtWidgets import *
from PyQt5.QtGui import *
from PyQt5 import QtGui;
from PyQt5 import QtCore;
from PyQt5.Qt import QColor
from PyQt5.QtWidgets import QApplication, QWidget
from PyQt5.QtGui import QPainter, QBrush, QPen
from PyQt5.QtCore import Qt
import sys

class Trace(QWidget):#etape2 exo2: mise en place de Trace + le variable d'epaisseur et de couleur
    def __init__(self):
        super().__init__()
        self.setMinimumSize(250, 250)
        self.points = []
        self.width = 1#etape2 exo2: mise en place de Trace + le variable d'epaisseur et de couleur(epaisseur par defaut)
        self.color = QColor(0, 0, 0)#etape2 exo2: mise en place de Trace + le variable d'epaisseur et de couleur (couleur par defaut)

    def __init__(self, _color, _width):#permet le tracer via une couleur et epaisseur qui s'update en temps réel
        super().__init__()
        self.setMinimumSize(250, 250)
        self.points = []
        self.width = _width
        self.color = _color