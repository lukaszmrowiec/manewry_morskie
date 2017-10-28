const model = {
  graczA: ['0000', '0001', '0003', '0004', '0005', '0006', '0007', '0008', '0010', '0011',
    '0100', '0101', '0104', '0105', '0106', '0107', '0108', '0110', '0111',
    '0200', '0207', '0208', '0210', '0211', '0307', '0311'],
  portA: ['0000', '0001', '0002', '0003', '0004', '0005', '0006', '0007', '0008', '0009', '0010', '0011',
    '0100', '0101', '0102', '0103', '0104', '0105', '0106', '0107', '0108', '0109', '0110', '0111',
    '0200', '0201', '0207', '0208', '0209', '0210', '0211', '0307', '0308', '0309', '0310', '0311'],
  graczB: ['1400', '1404', '1500', '1501', '1503', '1504', '1511',
    '1600', '1601', '1603', '1604', '1605', '1606', '1607', '1610', '1611',
    '1700', '1701', '1703', '1704', '1705', '1706', '1707', '1708', '1710', '1711'],
  portB: ['1400', '1401', '1402', '1403', '1404', '1500', '1501', '1502', '1503', '1504', '1510', '1511',
    '1600', '1601', '1602', '1603', '1604', '1605', '1606', '1607', '1608', '1609', '1610', '1611',
    '1700', '1701', '1702', '1703', '1704', '1705', '1706', '1707', '1708', '1709', '1710', '1711'],
  neutralny: ['0605', '0705', '0706', '0707', '0804', '0805', '0806', '0807', '0904', '0905',
    '0906', '0907', '1004', '1005', '1006', '1106'],
  shipsA: [{
    nazwa: 'pancernik', ruch: 2, ulega: ['okretPodwodny', 'bateriaNadbrzezna', 'mina'], klasa: 'pancernikA', opis: 'Pancernik',
  },
  {
    nazwa: 'pancernik', ruch: 2, ulega: ['okretPodwodny', 'bateriaNadbrzezna', 'mina'], klasa: 'pancernikA', opis: 'Pancernik',
  },
  {
    nazwa: 'pancernik', ruch: 2, ulega: ['okretPodwodny', 'bateriaNadbrzezna', 'mina'], klasa: 'pancernikA', opis: 'Pancernik',
  },
  {
    nazwa: 'okretRakietowy', ruch: 1, ulega: ['pancernik', 'okretPodwodny', 'mina'], klasa: 'rakietowyA', opis: 'Okręt Rakietowy',
  },
  {
    nazwa: 'okretRakietowy', ruch: 1, ulega: ['pancernik', 'okretPodwodny', 'mina'], klasa: 'rakietowyA', opis: 'Okręt Rakietowy',
  },
  {
    nazwa: 'okretRakietowy', ruch: 1, ulega: ['pancernik', 'okretPodwodny', 'mina'], klasa: 'rakietowyA', opis: 'Okręt Rakietowy',
  },
  {
    nazwa: 'krazawnik', ruch: 2, ulega: ['pancernik', 'okretRakietowy', 'okretPodwodny', 'bateriaNadbrzezna', 'mina'], klasa: 'krazawnikA', opis: 'Krązownik',
  },
  {
    nazwa: 'krazawnik', ruch: 2, ulega: ['pancernik', 'okretRakietowy', 'okretPodwodny', 'bateriaNadbrzezna', 'mina'], klasa: 'krazawnikA', opis: 'Krązownik',
  },
  {
    nazwa: 'krazawnik', ruch: 2, ulega: ['pancernik', 'okretRakietowy', 'okretPodwodny', 'bateriaNadbrzezna', 'mina'], klasa: 'krazawnikA', opis: 'Krązownik',
  },
  {
    nazwa: 'niszczyciel', ruch: 4, ulega: ['pancernik', 'okretRakietowy', 'krazawnik', 'okretPodwodny', 'bateriaNadbrzezna', 'mina'], klasa: 'niszczycielA', opis: 'Niszczyciel',
  },
  {
    nazwa: 'niszczyciel', ruch: 4, ulega: ['pancernik', 'okretRakietowy', 'krazawnik', 'okretPodwodny', 'bateriaNadbrzezna', 'mina'], klasa: 'niszczycielA', opis: 'Niszczyciel',
  },
  {
    nazwa: 'niszczyciel', ruch: 4, ulega: ['pancernik', 'okretRakietowy', 'krazawnik', 'okretPodwodny', 'bateriaNadbrzezna', 'mina'], klasa: 'niszczycielA', opis: 'Niszczyciel',
  },
  {
    nazwa: 'niszczyciel', ruch: 4, ulega: ['pancernik', 'okretRakietowy', 'krazawnik', 'okretPodwodny', 'bateriaNadbrzezna', 'mina'], klasa: 'niszczycielA', opis: 'Niszczyciel',
  },
  {
    nazwa: 'okretPodwodny', ruch: 2, ulega: ['eskortowiec', 'niszczyciel', 'bateriaNadbrzezna', 'mina'], klasa: 'podwodnyA', opis: 'Okręt Podwodny',
  },
  {
    nazwa: 'okretPodwodny', ruch: 2, ulega: ['eskortowiec', 'niszczyciel', 'bateriaNadbrzezna', 'mina'], klasa: 'podwodnyA', opis: 'Okręt Podwodny',
  },
  {
    nazwa: 'okretPodwodny', ruch: 2, ulega: ['eskortowiec', 'niszczyciel', 'bateriaNadbrzezna', 'mina'], klasa: 'podwodnyA', opis: 'Okręt Podwodny',
  },
  {
    nazwa: 'okretPodwodny', ruch: 2, ulega: ['eskortowiec', 'niszczyciel', 'bateriaNadbrzezna', 'mina'], klasa: 'podwodnyA', opis: 'Okręt Podwodny',
  },
  {
    nazwa: 'eskortowiec', ruch: 3, ulega: ['pancernik', 'okretRakietowy', 'krazawnik', 'niszczyciel', 'bateriaNadbrzezna', 'mina'], klasa: 'eskortowiecA', opis: 'Eskortowiec',
  },
  {
    nazwa: 'eskortowiec', ruch: 3, ulega: ['pancernik', 'okretRakietowy', 'krazawnik', 'niszczyciel', 'bateriaNadbrzezna', 'mina'], klasa: 'eskortowiecA', opis: 'Eskortowiec',
  },
  {
    nazwa: 'eskortowiec', ruch: 3, ulega: ['pancernik', 'okretRakietowy', 'krazawnik', 'niszczyciel', 'bateriaNadbrzezna', 'mina'], klasa: 'eskortowiecA', opis: 'Eskortowiec',
  },
  {
    nazwa: 'eskortowiec', ruch: 3, ulega: ['pancernik', 'okretRakietowy', 'krazawnik', 'niszczyciel', 'bateriaNadbrzezna', 'mina'], klasa: 'eskortowiecA', opis: 'Eskortowiec',
  },
  {
    nazwa: 'trałowiec', ruch: 2, ulega: ['pancernik', 'okretRakietowy', 'krazawnik', 'niszczyciel', 'okretPodwodny', 'eskortowiec', 'mina'], klasa: 'tralowiecA', opis: 'Trałowiec',
  },
  {
    nazwa: 'trałowiec', ruch: 2, ulega: ['pancernik', 'okretRakietowy', 'krazawnik', 'niszczyciel', 'okretPodwodny', 'eskortowiec', 'mina'], klasa: 'tralowiecA', opis: 'Trałowiec',
  },
  {
    nazwa: 'trałowiec', ruch: 2, ulega: ['pancernik', 'okretRakietowy', 'krazawnik', 'niszczyciel', 'okretPodwodny', 'eskortowiec', 'mina'], klasa: 'tralowiecA', opis: 'Trałowiec',
  },
  {
    nazwa: 'trałowiec', ruch: 2, ulega: ['pancernik', 'okretRakietowy', 'krazawnik', 'niszczyciel', 'okretPodwodny', 'eskortowiec', 'mina'], klasa: 'tralowiecA', opis: 'Trałowiec',
  },
  {
    nazwa: 'okretDesantowy', ruch: 1, ulega: ['pancernik', 'okretRakietowy', 'krazawnik', 'niszczyciel', 'okretPodwodny', 'eskortowiec', 'bateriaNadbrzezna', 'mina'], ilosc: 1, klasa: 'desantowyA', opis: 'Okręt Desantowy',
  },
  {
    nazwa: 'bateriaNadbrzezna', ruch: 2, ulega: ['okretRakietowy'], klasa: 'bateriaA', opis: 'Bateria Nadbrzeżna',
  },
  {
    nazwa: 'bateriaNadbrzezna', ruch: 2, ulega: ['okretRakietowy'], klasa: 'bateriaA', opis: 'Bateria Nadbrzeżna',
  },
  {
    nazwa: 'bateriaNadbrzezna', ruch: 2, ulega: ['okretRakietowy'], klasa: 'bateriaA', opis: 'Bateria Nadbrzeżna',
  },
  {
    nazwa: 'bateriaNadbrzezna', ruch: 2, ulega: ['okretRakietowy'], klasa: 'bateriaA', opis: 'Bateria Nadbrzeżna',
  },
  {
    nazwa: 'mina', ruch: 0, ulega: ['Trałowiec'], klasa: 'minaA', opis: 'Mina',
  },
  {
    nazwa: 'mina', ruch: 0, ulega: ['Trałowiec'], klasa: 'minaA', opis: 'Mina',
  },
  {
    nazwa: 'mina', ruch: 0, ulega: ['Trałowiec'], klasa: 'minaA', opis: 'Mina',
  },
  {
    nazwa: 'mina', ruch: 0, ulega: ['Trałowiec'], klasa: 'minaA', opis: 'Mina',
  },
  {
    nazwa: 'mina', ruch: 0, ulega: ['Trałowiec'], klasa: 'minaA', opis: 'Mina',
  },
  {
    nazwa: 'mina', ruch: 0, ulega: ['Trałowiec'], klasa: 'minaA', opis: 'Mina',
  },
  ],
  shipsB: [{
    nazwa: 'pancernik', ruch: 2, ulega: ['okretPodwodny', 'bateriaNadbrzezna', 'mina'], klasa: 'pancernikB', opis: 'Pancernik',
  },
  {
    nazwa: 'pancernik', ruch: 2, ulega: ['okretPodwodny', 'bateriaNadbrzezna', 'mina'], klasa: 'pancernikB', opis: 'Pancernik',
  },
  {
    nazwa: 'pancernik', ruch: 2, ulega: ['okretPodwodny', 'bateriaNadbrzezna', 'mina'], klasa: 'pancernikB', opis: 'Pancernik',
  },
  {
    nazwa: 'okretRakietowy', ruch: 1, ulega: ['pancernik', 'okretPodwodny', 'mina'], klasa: 'rakietowyB', opis: 'Okręt Rakietowy',
  },
  {
    nazwa: 'okretRakietowy', ruch: 1, ulega: ['pancernik', 'okretPodwodny', 'mina'], klasa: 'rakietowyB', opis: 'Okręt Rakietowy',
  },
  {
    nazwa: 'okretRakietowy', ruch: 1, ulega: ['pancernik', 'okretPodwodny', 'mina'], klasa: 'rakietowyB', opis: 'Okręt Rakietowy',
  },
  {
    nazwa: 'krazawnik', ruch: 2, ulega: ['pancernik', 'okretRakietowy', 'okretPodwodny', 'bateriaNadbrzezna', 'mina'], klasa: 'krazawnikB', opis: 'Krązownik',
  },
  {
    nazwa: 'krazawnik', ruch: 2, ulega: ['pancernik', 'okretRakietowy', 'okretPodwodny', 'bateriaNadbrzezna', 'mina'], klasa: 'krazawnikB', opis: 'Krązownik',
  },
  {
    nazwa: 'krazawnik', ruch: 2, ulega: ['pancernik', 'okretRakietowy', 'okretPodwodny', 'bateriaNadbrzezna', 'mina'], klasa: 'krazawnikB', opis: 'Krązownik',
  },
  {
    nazwa: 'niszczyciel', ruch: 4, ulega: ['pancernik', 'okretRakietowy', 'krazawnik', 'okretPodwodny', 'bateriaNadbrzezna', 'mina'], klasa: 'niszczycielB', opis: 'Niszczyciel',
  },
  {
    nazwa: 'niszczyciel', ruch: 4, ulega: ['pancernik', 'okretRakietowy', 'krazawnik', 'okretPodwodny', 'bateriaNadbrzezna', 'mina'], klasa: 'niszczycielB', opis: 'Niszczyciel',
  },
  {
    nazwa: 'niszczyciel', ruch: 4, ulega: ['pancernik', 'okretRakietowy', 'krazawnik', 'okretPodwodny', 'bateriaNadbrzezna', 'mina'], klasa: 'niszczycielB', opis: 'Niszczyciel',
  },
  {
    nazwa: 'niszczyciel', ruch: 4, ulega: ['pancernik', 'okretRakietowy', 'krazawnik', 'okretPodwodny', 'bateriaNadbrzezna', 'mina'], klasa: 'niszczycielB', opis: 'Niszczyciel',
  },
  {
    nazwa: 'okretPodwodny', ruch: 2, ulega: ['eskortowiec', 'niszczyciel', 'bateriaNadbrzezna', 'mina'], klasa: 'podwodnyB', opis: 'Okręt Podwodny',
  },
  {
    nazwa: 'okretPodwodny', ruch: 2, ulega: ['eskortowiec', 'niszczyciel', 'bateriaNadbrzezna', 'mina'], klasa: 'podwodnyB', opis: 'Okręt Podwodny',
  },
  {
    nazwa: 'okretPodwodny', ruch: 2, ulega: ['eskortowiec', 'niszczyciel', 'bateriaNadbrzezna', 'mina'], klasa: 'podwodnyB', opis: 'Okręt Podwodny',
  },
  {
    nazwa: 'okretPodwodny', ruch: 2, ulega: ['eskortowiec', 'niszczyciel', 'bateriaNadbrzezna', 'mina'], klasa: 'podwodnyB', opis: 'Okręt Podwodny',
  },
  {
    nazwa: 'eskortowiec', ruch: 3, ulega: ['pancernik', 'okretRakietowy', 'krazawnik', 'niszczyciel', 'bateriaNadbrzezna', 'mina'], klasa: 'eskortowiecB', opis: 'Eskortowiec',
  },
  {
    nazwa: 'eskortowiec', ruch: 3, ulega: ['pancernik', 'okretRakietowy', 'krazawnik', 'niszczyciel', 'bateriaNadbrzezna', 'mina'], klasa: 'eskortowiecB', opis: 'Eskortowiec',
  },
  {
    nazwa: 'eskortowiec', ruch: 3, ulega: ['pancernik', 'okretRakietowy', 'krazawnik', 'niszczyciel', 'bateriaNadbrzezna', 'mina'], klasa: 'eskortowiecB', opis: 'Eskortowiec',
  },
  {
    nazwa: 'eskortowiec', ruch: 3, ulega: ['pancernik', 'okretRakietowy', 'krazawnik', 'niszczyciel', 'bateriaNadbrzezna', 'mina'], klasa: 'eskortowiecB', opis: 'Eskortowiec',
  },
  {
    nazwa: 'trałowiec', ruch: 2, ulega: ['pancernik', 'okretRakietowy', 'krazawnik', 'niszczyciel', 'okretPodwodny', 'eskortowiec', 'mina'], klasa: 'tralowiecB', opis: 'Trałowiec',
  },
  {
    nazwa: 'trałowiec', ruch: 2, ulega: ['pancernik', 'okretRakietowy', 'krazawnik', 'niszczyciel', 'okretPodwodny', 'eskortowiec', 'mina'], klasa: 'tralowiecB', opis: 'Trałowiec',
  },
  {
    nazwa: 'trałowiec', ruch: 2, ulega: ['pancernik', 'okretRakietowy', 'krazawnik', 'niszczyciel', 'okretPodwodny', 'eskortowiec', 'mina'], klasa: 'tralowiecB', opis: 'Trałowiec',
  },
  {
    nazwa: 'trałowiec', ruch: 2, ulega: ['pancernik', 'okretRakietowy', 'krazawnik', 'niszczyciel', 'okretPodwodny', 'eskortowiec', 'mina'], klasa: 'tralowiecB', opis: 'Trałowiec',
  },
  {
    nazwa: 'okretDesantowy', ruch: 1, ulega: ['pancernik', 'okretRakietowy', 'krazawnik', 'niszczyciel', 'okretPodwodny', 'eskortowiec', 'bateriaNadbrzezna', 'mina'], ilosc: 1, klasa: 'desantowyB', opis: 'Okręt Desantowy',
  },
  {
    nazwa: 'bateriaNadbrzezna', ruch: 2, ulega: ['okretRakietowy'], klasa: 'bateriaB', opis: 'Bateria Nadbrzeżna',
  },
  {
    nazwa: 'bateriaNadbrzezna', ruch: 2, ulega: ['okretRakietowy'], klasa: 'bateriaB', opis: 'Bateria Nadbrzeżna',
  },
  {
    nazwa: 'bateriaNadbrzezna', ruch: 2, ulega: ['okretRakietowy'], klasa: 'bateriaB', opis: 'Bateria Nadbrzeżna',
  },
  {
    nazwa: 'bateriaNadbrzezna', ruch: 2, ulega: ['okretRakietowy'], klasa: 'bateriaB', opis: 'Bateria Nadbrzeżna',
  },
  {
    nazwa: 'mina', ruch: 0, ulega: ['Trałowiec'], klasa: 'minaB', opis: 'Mina',
  },
  {
    nazwa: 'mina', ruch: 0, ulega: ['Trałowiec'], klasa: 'minaB', opis: 'Mina',
  },
  {
    nazwa: 'mina', ruch: 0, ulega: ['Trałowiec'], klasa: 'minaB', opis: 'Mina',
  },
  {
    nazwa: 'mina', ruch: 0, ulega: ['Trałowiec'], klasa: 'minaB', opis: 'Mina',
  },
  {
    nazwa: 'mina', ruch: 0, ulega: ['Trałowiec'], klasa: 'minaB', opis: 'Mina',
  },
  {
    nazwa: 'mina', ruch: 0, ulega: ['Trałowiec'], klasa: 'minaB', opis: 'Mina',
  },
  ],
}; // koniec obiektu 'model'
