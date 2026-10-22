import { supabase } from "../connection/supabase"

const TABELA = "Tabela"          // troque pelo nome real da sua tabela
const NTFY_TOPICO = "Etec"  // troque pelo seu tópico

async function enviarNotificacao(titulo, dataConclusao) {
    await fetch("https://ntfy.sh/", {
        method: "POST",
        body: JSON.stringify({
            topic: NTFY_TOPICO,
            title: titulo,
            message: `Conclusão: ${dataConclusao}`,
        }),
    })
}

export async function pegarLista() {
    const { data, error } = await supabase
        .from(TABELA)
        .select()
        .order("id", { ascending: true })

    if (error) throw error
    return data
}

export async function novaTarefa({ titulo, descricao, data }) {
    const { data: criada, error } = await supabase
        .from(TABELA)
        .insert({ titulo, descricao, data_conclusao: data })
        .select()
        .single()

    if (error) throw error
    await enviarNotificacao(criada.titulo, criada.data_conclusao)
    return criada
}

export async function mudarTarefa(id, { titulo, descricao, data }) {
    const { data: atualizada, error } = await supabase
        .from(TABELA)
        .update({ titulo, descricao, data_conclusao: data })
        .eq("id", id)
        .select()
        .single()

    if (error) throw error
    return atualizada
}

export async function apagarTarefa(id) {
    const { error } = await supabase.from(TABELA).delete().eq("id", id)
    if (error) throw error
}