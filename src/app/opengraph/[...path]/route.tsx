import Icon from '@/components/modules/kb/articles/Icons'
import {RequestContext} from '@/types'
import {findArticleByHref} from '@/utils'
import {ImageResponse, NextRequest, NextResponse} from 'next/server'
import KBIndex from '@/KBIndex.json'

export const runtime = 'edge'
const size = {
  width: 1200,
  height: 630
}

export const GET = async (
  request: NextRequest,
  {params}: RequestContext<'path', string[]>
) => {
  try {
    const {path} = params
    const searchParams = new URLSearchParams(request.nextUrl.search)
    const type = searchParams.get('type') || null
    let article = null

    if (type === 'kb') {
      article = findArticleByHref(KBIndex, `/kb/${path.join('/')}`)
    }

    const fetchFont = await fetch(
      `${request.nextUrl.origin}/fonts/opengraph.ttf`
    ).then(res => res.arrayBuffer())

    return new ImageResponse(
      (
        <div
          tw="flex bg-slate-900 w-full h-full relative text-white justify-center"
          style={{
            fontFamily: 'opengraph'
          }}>
          <div tw="absolute items-center flex w-[75%] justify-between h-full">
            <div tw="flex flex-col">
              <h1 tw="mt-8 text-sky-500 text-6xl">gnaumann.de</h1>
              {article && <h2 tw="text-3xl">{article.title}</h2>}
              {article && article.icons && article.icons.length > 0 && (
                <div tw="flex">
                  {article.icons.map((icon, index) => (
                    <div key={index} tw="pr-3 flex">
                      <Icon name={icon} size={35} />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div tw="flex border border-sky-500 h-full" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${request.nextUrl.origin}/gnaumann_col_cut.png`}
              alt="Logo"
              height={400}
              width={315}
            />
          </div>
        </div>
      ),
      {
        ...size,
        fonts: [
          {
            name: 'opengraph',
            data: fetchFont,
            weight: 400,
            style: 'normal'
          }
        ]
      }
    )
  } catch (error: any) {
    console.error(error)
    return NextResponse.json(
      {code: error.code || 500, message: error},
      {status: error.code || 500}
    )
  }
}
