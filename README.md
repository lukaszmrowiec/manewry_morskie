Gra planszowa dla dwóch osób.

Każdy z graczy ma swój zestaw okrętów. Każdy z okrętów ma określone właściwości np. listę okrętów którym ulega, na podstawie której określa się które okręty pokonuje oraz inne cechy które dokładnie precyzuje tabela w instrukcji gry.
Gra przebiega w turach. Gracze wykonują swoje ruchy naprzemiennie aż do momentu wprowadzenia swojego „Okrętu Desantowego“ do portu przeciwnika. Utrata „Okrętu Desantowego“ oznacza przegraną. Możliwe są różne strategie rozmieszczania okrętów i przeprowadzania bitew.

Technologia

Gra jest napisana w JavaScript, zarówno Front-End jak i Back-End. Do przesyłu danych między graczami wykorzystuje WebSocket z Socket.io, a po stronie serwera Node.js z frameworkiem Express.js
Architektura gry bazuje na wzorcu MVC. Rozdzieliłem funkcje odpowiedzialne za widok od funkcji kontrolujących działanie gry. Również statyczne dane mają swoje wydzielone miejsce.
Gracz „A“ ma swoje okrętu w dolnej części ekranu, z kolei gracz „B“ widzi okręty gracza „A" (ale bez opisów) w górnej części swojego ekranu. Gracz „B“ widzi okręty gracza „A“ również w górnej części swojego widoku.
Plansze obu graczy są na bieżąco aktualizowane.
Do wyświetlania możliwych pól ruchu okrętów użyłem wzoru Czebyszewa który określa odległość w przestrzeni dwóch punktów: Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));


