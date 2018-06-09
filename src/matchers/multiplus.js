const axios = require('axios')

const multiplusMatcher = (offer) => {
    const options = {
        method: 'get',
        url: 'https://www.pontosmultiplus.com.br/troque/casasbahia/typeahead',
        params: {
            Dy: 1,
            Nty: 1,
            Ntt: 'CHAPINHA | PRANCHA MONDIAL GOLDEN ROSE P20 220°C CERÂMICA E TOURMALINE - ROSA'
        }
    }

    return axios(options)
        .then(response => response.data.data)
        .then(data => {
            const obj = {}
            let vendor
            for (let i = 0; i < data.suggestions.length - 1; i++) {
                if (data.suggestions[i].label == "Casas Bahia") {
                    vendor = "casasBahia"
                }
                if (data.suggestions[i].label == "Extra") {
                    vendor = "extra"
                }
                if (data.suggestions[i].label == "Ponto Frio") {
                    vendor = "pontoFrio"
                }
                if (data.suggestions[i].label == "Fast Shop") {
                    vendor = "fastShop"
                }
            }

            data.results.forEach(element => {
                obj.program = 'multiplus'
                obj.vendor = vendor
                obj.name = element.name
                obj.pointPrice = element.price.full.to
                obj.pointPriceFrom = element.price.full.from[0]
            })

            return obj
        })
}

module.exports = multiplusMatcher