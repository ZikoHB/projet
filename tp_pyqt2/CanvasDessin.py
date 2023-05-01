from PyQt5.QtWidgets import *
from PyQt5.QtGui import *
from PyQt5 import QtGui;
from PyQt5 import QtCore;
import ButtonModel
from PyQt5.Qt import QColor
from PyQt5.QtWidgets import QApplication, QWidget
from PyQt5.QtGui import QPainter, QBrush, QPen
from PyQt5.QtCore import Qt
import Trace
import sys

class CanvasDessin(QWidget):#etape1 exo2: mise en place de CanvasDessin + Dessin
    def __init__(self):
        super().__init__()
        self.setMinimumSize(250, 250)
        self.width = 20
        self.color = QColor(1, 1, 1)
        self.traces = []

    def paint(self, position):#permet la colorisation
        self.traces[len(self.traces)-1].points.append(position)

    def mousePressEvent(self, event):#etape3 exo2: evenement de souris herité de CanvasButton, correspond a press, quand on appuie, ça dessine
        print("mouse press")
        self.traces.append(Trace.Trace(self.color, self.width))
        super().mousePressEvent(event)
        self.update()

    def setColor(self, _color):#etape4 exo2: permet la modif de couleur
        self.color = _color

    def setWidth(self, _width):#etape4 exo2: permet la modif d'epaisseur
        self.width = _width

    def mouseMoveEvent(self, event):#etape3 exo2: evenement de souris herité de CanvasButton, correspond a drag, tant qu'on garde le click souris + mouvement de souris,
        print("mouse move")			#l'evenement paint a la position du curseur se declenche
        self.paint(event.pos())
        super().mouseMoveEvent(event)
        self.update()

    def mouseReleaseEvent(self, event):#etape3 exo2: evenement de souris herité de CanvasButton, correspond a release, quand on relache le click souris, ça arrete de dessiner
        print("release move")
        super().mouseReleaseEvent(event)
        self.update()

    def reset(self):#etape5 exo2: focntion qui permet l'effacement du canvas
        print("reset")
        self.traces = []
        self.update()

    def paintEvent(self, event):#etape3 exo2: evenement herité de CanvasButton, a partir du click, tant que nouveau point sont detecter via les mouvement de la souris, la fonction "trace" (en realité
        painter = QPainter(self)#ça colorise le point) pour simuler le tracer (simulation effectuer avec des "traits" tracer entre les points via QPainterPath())
        for trace in self.traces:
            painter.setRenderHint(QPainter.Antialiasing, True)
            currentColor = trace.color
            currentWidth = trace.width
            painter.setPen(QPen(currentColor, currentWidth, Qt.SolidLine))
            path = QPainterPath()
            if(len(trace.points) > 0):
                path.moveTo(trace.points[0])
            for point in trace.points:
                path.lineTo(point)
            painter.drawPath(path)
        painter.end()