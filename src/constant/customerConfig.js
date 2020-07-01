export const customerHeadCells = [
  { id: 'amount', badge: false, defaultOrderBy: false, label: 'Montant' },
  { id: 'customerNum', badge: false, defaultOrderBy: true, label: 'ID' },
  { id: 'orderRef', badge: false, defaultOrderBy: false, label: 'Réf Commande' },
  { id: 'creationDate', badge: false, defaultOrderBy: false, label: 'Date & heure' },
  { id: 'paymentOption', badge: false, defaultOrderBy: false, label: 'Moyen de paiement' },
  { id: 'type', badge: false, defaultOrderBy: false, label: 'Type' },
  { id: 'status', badge: true, defaultOrderBy: false, label: 'Statut' },
];

export const customerTabFiltre = [
  { id: 0, defaultSelected: true, label: 'Toutes', name: 'All' },
  { id: 1, defaultSelected: false, label: 'Autoristions', name: 'Autorisation' },
  { id: 2, defaultSelected: false, label: 'Remboursements', name: 'Refund' },
  { id: 3, defaultSelected: false, label: 'Annulations', name: 'Cancel' },
  { id: 4, defaultSelected: false, label: 'Captures', name: 'Capture' },
];
