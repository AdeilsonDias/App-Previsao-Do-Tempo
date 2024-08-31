const buscarCidade = document.querySelector(".find_city");
const cityName = document.querySelector(".box_result");
const temp = document.querySelector(".temp");
const ceu = document.querySelector(".ceu");
const umidade = document.querySelector(".umidade");
const input = document.querySelector(".inputValue"); // Adiciona a referência ao campo de entrada

const apiKey = "c9c9b22c871fa82fd5fc57cb0b68960c";

async function getWeather() {
    const inputValue = input.value.trim(); // Usa a variável de referência e remove espaços em branco
    
    if (inputValue === "") {
        cityName.innerHTML = "Por favor, insira o nome de uma cidade.";
        temp.innerHTML = "";
        ceu.innerHTML = "";
        umidade.innerHTML = "";
        return;
    }
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&lang=pt_br&units=metric`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        acharCidade(data);
    } catch (error) {
        console.log("Erro ao buscar a cidade", error);
        cityName.innerHTML = "Erro ao buscar dados da cidade.";
        temp.innerHTML = "";
        ceu.innerHTML = "";
        umidade.innerHTML = "";
    } finally {
        // Limpa o campo de entrada após a busca, independentemente do resultado
        input.value = "";
    }
}

function acharCidade(data) {
    cityName.innerHTML = `Tempo em ${data.name}`;
    temp.innerHTML = `Temperatura: ${Math.floor(data.main.temp)}ºC`;
    ceu.innerHTML = ` ${data.weather[0].description}`;
    umidade.innerHTML = `${data.main.humidity} %`;
}

buscarCidade.addEventListener("click", getWeather);
