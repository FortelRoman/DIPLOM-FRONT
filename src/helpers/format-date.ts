import dayjs from "dayjs";
dayjs.locale('ru');

export const formatDate = (stringDate?: string) => {
    if (!stringDate) return null;

    const date = dayjs(stringDate);

    return date.isValid() ? date.locale('ru').format('DD MMMM YYYY') : null;
}