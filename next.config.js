/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

import createMDX from '@next/mdx'

const withMDX = createMDX()

export default withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
})


module.exports = nextConfig
