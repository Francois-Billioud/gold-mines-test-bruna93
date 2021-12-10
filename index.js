function findBestSpot(landWidth, landHeight, exploitationWidth, exploitationHeight, goldMines) {
	// Define um array que armazena os valores de coordenadas x, y e minas de ouro de todas as área analisadas
	// Formato do array: [{
	// 	x: int,
	//	y: int,
	//	goldMines: int
	//}]
	let arrayGold = [];

	// Cria a matrix que representa o mapa geral
	let map = [];
	// Laço que preenche a largura do mapa com 0
	for (let i = 0; i < landWidth; i++) {
		// Preenche o indice de vetor com outro vetor (para criar a matriz)
		map[i] = []
		for (let j = 0; j < landHeight; j++) {	// Altura do mapa
			// Preenche o mapa com 0
			map[i][j] = 0
		}
	}

	// Verifica se a largura ou a altura da terra é zero
	if (landWidth === 0 || landHeight === 0) {
		// Força um tamanho fixo para o mapa
		map = [
			[0, 0],
			[0, 0]
		];
	}

	// Laço que percorre os dados de goldMines para colocar os locais das minas na matriz do mapa
	for (let i = 0; i < goldMines.length; i++) {
		// Adiciona um local de mina na matriz do mapa de acordo com o indice do goldMines
		map[goldMines[i].x][goldMines[i].y] = 1;
	}

	// Define duas variáveis que serão usadas no laço para calcular a área
	let exploitationWidthAuxiliar = exploitationWidth;
	let exploitationHeightAuxiliar = exploitationHeight;

	// Verifica se a largura da área de exploração é maior que a largura da área do mapa
	if (exploitationWidth > landWidth) {
		// Limita a área de exploração
		exploitationWidthAuxiliar = landWidth;
	}
	// Verifica se a altura da área de exploração é maior que a altura do mapa
	if (exploitationHeight > landHeight) {
		// Limita a área de exploração
		exploitationHeightAuxiliar = landHeight;
	}

	// Laço que percorre a largura do mapa
	for (let i = 0; i < landWidth - exploitationWidthAuxiliar + 1; i++) {
		for (let j = 0; j < landHeight - exploitationHeightAuxiliar + 1; j++) {	// Altura do mapa
			// Variável que é um contador de minas de ouro para cada área de mapa analisada
			let goldMineCount = 0;

			// Laço que percorre a largura da área de exploração
			for (let k = 0; k < exploitationWidthAuxiliar; k++) {
				for (let l = 0; l < exploitationHeightAuxiliar; l++) {	// Altura da área de exploração
					// Verifica se a área atual possuí uma mina
					if (map[i + k][j + l] !== 0) {
						// Aumenta o contador de minas de ouro
						goldMineCount = goldMineCount + 1;
					}
				}
			}

			// Adiciona a área analisada ao array
			arrayGold.push({
				x: i,
				y: j,
				goldMines: goldMineCount
			});
		}
	}

	// Calcula qual é o valor máximo de minas de ouro encontrado
	const maxGoldMines = Math.max.apply(Math, arrayGold.map(function (o) {
		// Retorna o número de minas
		return o.goldMines;
	}))

	// Define um array auxiliar para receber apenas as áreas com maior número de minas
	let arrayGoldAuxiliar = [];

	// Laço que percorre o array de áreas de minas para verificar a quantidade de minas em cada área
	for (let i = 0; i < arrayGold.length; i++) {
		// Verifica se a quantidade de minas no indice atual é o máximo
		if (arrayGold[i].goldMines === maxGoldMines) {
			// Adiciona essa área ao array auxiliar
			arrayGoldAuxiliar.push(arrayGold[i]);
		}
	}

	// Retorna os valores
	return {
		// Retorna apenas os valores do indice 0 do vetor auxiliar (valores mais próximos do left top)
		coordinates: {
			x: arrayGoldAuxiliar[0].x,
			y: arrayGoldAuxiliar[0].y,
		},
		goldMines: arrayGoldAuxiliar[0].goldMines
	}
}

module.exports = findBestSpot;
