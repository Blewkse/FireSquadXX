enum RobotState {
  free = 'Free',
  inOperation = 'In operation',
  travelingToOperation = 'Traveling to operation',
  travelingToRefuel = 'Traveling to refuel',
  refueling = 'Ravitaillement',
}

enum RobotType {
  citerne = 'Citerne',
  extincteur = 'Extincteur',
  rapido = 'Rapido',
}

export { RobotState, RobotType }
