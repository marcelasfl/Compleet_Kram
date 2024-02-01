import api from "./api";

type getAddressByCepResponse = {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
}

export const ViaCepService = {
    getAddressByCep: async function (cep: string): Promise<getAddressByCepResponse> {
        const { data } = await api.get(`https://viacep.com.br/ws/${cep}/json/`);
        return data;
    },
}