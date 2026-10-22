import { View, Text, TextInput, Button, Alert } from 'react-native'
import { useState } from 'react'

function CriarEditar({ tarefaInicial, onSalvar }) {
    const [titulo, setTitulo] = useState(tarefaInicial?.Titulo ?? '')
    const [descricao, setDescricao] = useState(tarefaInicial?.Descricao ?? '')
    const [data, setData] = useState(tarefaInicial?.DataConclusao ?? '')

    function aoClicarSalvar() {
        if (!titulo.trim()) {
            Alert.alert('Atenção', 'O título é obrigatório.')
            return
        }
        onSalvar({ titulo, descricao, data })
    }

    return (
        <View>
            <Text>Crie um Título</Text>
            <TextInput placeholder="Título Padrão" value={titulo} onChangeText={setTitulo} />

            <Text>Forneça uma Descrição</Text>
            <TextInput placeholder="Descrição Padrão" value={descricao} onChangeText={setDescricao} />

            <Text>Data de término (Ano-Mês-Dia)</Text>
            <TextInput placeholder="0000-00-00" value={data} onChangeText={setData} />

            <Button title="Salvar" onPress={aoClicarSalvar} />
        </View>
    )
}

export default CriarEditar