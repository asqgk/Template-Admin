import Head from 'next/head'
import Image from 'next/image'
import useAuth from '../../data/hook/useAuth'
import loading from '../../../public/images/loading.gif'
import { useRouter } from 'next/router'

export default function ForcarAutenticacao(props) {
    const { usuario, carregando } = useAuth()
    const router = useRouter()

    function renderizarConteudo() {
        return (
            <>
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                if(!document.cookie?.includes("admin-template-auth")){
                                    window.location.href = "/autenticacao"
                                }
                            `
                        }}
                    />
                </Head>
                {props.children}
            </>
        )
    }

    function renderizarCarregando() {
        return (
            <div className={`
                flex justify-center items-center h-screen
            `}>
                <Image
                    src={loading}
                    alt="Carregando imagem"
                />
            </div>
        )
    }

    if (!carregando && usuario?.email) {
        return renderizarConteudo()
    } else if (carregando) {
        return renderizarCarregando()
    } else {
        router.push('/autenticacao')
        return null
    }
}