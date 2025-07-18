import { Flex } from './index'

export default {
  title: 'flex',
  component: Flex,
}

export const Default = () => (
  <Flex style={{ gap: 8 }}>
    <div style={{ background: '#eee', padding: 8 }}>Item 1</div>
    <div style={{ background: '#eee', padding: 8 }}>Item 2</div>
  </Flex>
)
