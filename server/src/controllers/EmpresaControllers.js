const database = require('../models');

class EmpresaControllers {
    static async pegarsEmpresa(req, res) {
        const cnpj = String(req.params.cnpj || '').replace(/\D/g, '');

        if (cnpj.length !== 14) {
            return res.status(400).json({
                message: 'Informe um CNPJ válido com 14 dígitos.'
            });
        }

        try {
            const empresas = await database.sequelize.query(
                `SELECT
                    est.cnpj_completo AS cnpj,
                    est.nome_fantasia,
                    est.situacao_cadastral_codigo AS situacao_cadastral,
                    est.motivo_situacao_codigo,
                    mot.descricao AS motivo_situacao,
                    est.data_inicio_atividade,
                    est.cnae_principal_codigo,
                    cnae.descricao AS cnae_principal_descricao,
                    est.municipio_codigo,
                    mun.nome AS municipio,
                    emp.razao_social,
                    emp.natureza_juridica_codigo,
                    nat.descricao AS natureza_juridica,
                    emp.capital_social,
                    emp.porte_codigo AS porte,
                    soc.tipo_socio_codigo,
                    soc.nome_socio,
                    soc.documento_socio,
                    soc.qualificacao_codigo,
                    qual.descricao AS qualificacao,
                    soc.data_entrada
                FROM public.estabelecimentos est
                LEFT JOIN public.empresas emp
                    ON emp.id = est.empresa_id
                LEFT JOIN public.socios soc
                    ON soc.empresa_id = emp.id
                LEFT JOIN public.municipios mun
                    ON mun.codigo = est.municipio_codigo
                LEFT JOIN public.motivos_situacao mot
                    ON mot.codigo = est.motivo_situacao_codigo
                LEFT JOIN public.cnaes cnae
                    ON cnae.codigo = est.cnae_principal_codigo
                LEFT JOIN public.naturezas_juridicas nat
                    ON nat.codigo = emp.natureza_juridica_codigo
                LEFT JOIN public.qualificacoes qual
                    ON qual.codigo = soc.qualificacao_codigo
                WHERE est.cnpj_completo = :cnpj
                ORDER BY soc.nome_socio`,
                {
                    replacements: { cnpj },
                    type: database.Sequelize.QueryTypes.SELECT
                }
            );

            if (empresas.length === 0) {
                return res.status(404).json({ message: 'Nenhuma empresa encontrada com o CNPJ fornecido.' });
            }

            return res.status(200).json(empresas);
        } catch (error) {
            console.error('Erro ao buscar empresas:', error);
            return res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }
}

module.exports = EmpresaControllers;