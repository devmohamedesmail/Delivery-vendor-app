import { config } from '@/constants/config';
import axios from 'axios';

export const updateProfile = async (
    token: string,
    formData: {
        name: string;
        email: string;
        phone: string;
    },
    avatarFile?: any
) => {
    const formDataToSend = new FormData();

    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);

    if (avatarFile) {
        const fileExtension = avatarFile.uri.split('.').pop();
        const fileName = `avatar_${Date.now()}.${fileExtension}`;

        formDataToSend.append('avatar', {
            uri: avatarFile.uri,
            type: `image/${fileExtension}`,
            name: fileName,
        } as any);
    }

    const response = await axios.put(
        `${config.URL}/auth/update-profile`,
        formDataToSend,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        }
    );

    return response.data;
};
