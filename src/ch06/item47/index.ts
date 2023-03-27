interface SecretName {
    first: string;
    last: string;
}

interface SecretSanta {
    name: SecretName;
    gift: string;
}

type MySanta = ReturnType<typeof getGift>;  // SecretSanta
type MyName = Parameters<typeof getGift>[0]; // SecretName

export function getGift(name: SecretName, gift: string): SecretName {
    return;
}