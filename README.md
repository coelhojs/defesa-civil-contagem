##Perfis de usuário:
	*Admin (gestor + vistoriador + atendente englobados em uma única conta de acesso)
	*Cidadão

##Funcionalidades/Casos de uso mobile (usuário: Cidadão):
    *Cadastro de aviso
    *Lista de avisos/chamados com status
    *Ver áreas de risco no mapa
    *Ver seus chamados no mapa
    *Ligar para a Defesa Civil
    *Ver notícias

##Funcionalidades web (usuário: admin):
    *Ver mapa completo (áreas de risco e todos os chamados)
    *Processar avisos (criando chamado)
    *Lista de avisos
    *Lista de chamados
    *Atribuir chamados a equipes de vistoriadores
    *Cadastro de vistoriadores
    *Processar chamados


##Fluxos:
Cidadão envia aviso => Admin analisa aviso => {
    Se o aviso procede, Admin liga para o cidadão para coletar mais informações e criar o chamado
}