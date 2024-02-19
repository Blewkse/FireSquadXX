enum robotState {
  free = 'Free',
  inOperation = 'In operation',
  travelingToOperation = 'Traveling to operation',
  travelingToRefuel = 'Traveling to refuel',
  refueling = 'Ravitaillement',
}

enum robotType {
  citerne = 'Citerne',
  extincteur = 'Extincteur',
  rapido = 'Rapido',
}

export { robotState, robotType }
