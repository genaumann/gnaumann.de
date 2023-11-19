import {basePath} from '@/config'
import {ImageResponse} from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 180,
  height: 180
}
export const contentType = 'image/png'

const Icon = () => {
  return new ImageResponse(
    (
      <div tw="flex bg-slate-900 w-full h-full relative text-white justify-center">
        <div tw="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${basePath}/gnaumann_col_cut.png`}
            alt="Logo"
            height={150}
            width={110}
          />
        </div>
      </div>
    ),
    {
      ...size
    }
  )
}

export default Icon
