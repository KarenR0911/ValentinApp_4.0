import { z } from 'zod'

export const cardSchema = z.object({
  destinatario: z.string().min(3, 'Muy corto').max(80),
  semestre: z.string().min(1, 'Selecciona semestre del destinatario'),
  destino: z.string().min(2, 'Selecciona carrera'),
  texto: z.string().min(10, 'Escribe algo bonito 💌').max(1000),
  is_anonymous: z.boolean(),
  spotify_url: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        val.includes('open.spotify.com/track') ||
        val.includes('open.spotify.com/playlist'),
      { message: 'Link de Spotify inválido' },
    ),
})
