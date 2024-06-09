import { Typography } from 'antd';

const { Text } = Typography;

const FooterContent = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Text>(c)2024 The Canine Shelter</Text>
        </div>
    )
}

export default FooterContent