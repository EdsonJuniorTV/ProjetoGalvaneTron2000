import { useState, useEffect } from 'react'
import { View, Text, Button, FlatList, Alert } from 'react-native'
import CriarEditar from './actions/criarEditar'
import { pegarLista, novaTarefa, mudarTarefa, apagarTarefa } from './actions/actions'

export default function App() {
    const [tarefas, setTarefas] = useState([])
    const [editando, setEditando] = useState(null) // null = criando

    useEffect(() => { carregar() }, [])

    async function carregar() {
        try {
            setTarefas(await pegarLista())
        } catch (e) {
            Alert.alert('Erro ao carregar', e.message)
        }
    }

    async function salvar(campos) {
        try {
            if (editando) {
                await mudarTarefa(editando.id, campos)
            } else {
                await novaTarefa(campos)
            }
            setEditando(null)
            await carregar()
        } catch (e) {
            Alert.alert('Erro ao salvar', e.message)
        }
    }

    async function apagar(id) {
        try {
            await apagarTarefa(id)
            await carregar()
        } catch (e) {
            Alert.alert('Erro ao apagar', e.message)
        }
    }

    return (
        <View style={{ flex: 1, padding: 40 }}>
            {/* key força o formulário a reiniciar quando muda a tarefa em edição */}
            <CriarEditar key={editando?.id ?? 'nova'} tarefaInicial={editando} onSalvar={salvar} />

            <FlatList
                data={tarefas}
                keyExtractor={t => String(t.id)}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.Titulo} — {item.DataConclusao}</Text>
                        <Button title="Editar" onPress={() => setEditando(item)} />
                        <Button title="Apagar" onPress={() => apagar(item.id)} />
                    </View>
                )}
            />
        </View>
    )
}