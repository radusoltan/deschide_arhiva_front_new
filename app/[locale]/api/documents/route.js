import {Document, ExternalHyperlink, Packer, Paragraph, TextRun} from 'docx'
import {client} from "@/lib/elastic";
import {NextResponse} from "next/server";
import fs from 'fs';
import path from 'path'
export async function POST(request){
  try {
    const { startDate, endDate, language } = await request.json()
    const esResponse = await client.search({
      index: 'articles',
      query: {
        bool: {
          must: [
            {
              range: {
                published_at: {
                  gte: startDate,
                  lte: endDate,
                  format: 'yyyy-MM-dd',
                }
              }
            }
          ],
          filter: [
            {
              term: {language}
            }
          ]
        }
      },
      size: 20000
    })
    const documents = esResponse.hits.hits.map(article=>article._source)

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: documents.map((doc, index) =>
            new Paragraph({
              children: [
                new ExternalHyperlink({
                  children: [
                    new TextRun({
                      text: `${doc.title || 'N/A'} (${doc.published_at || 'N/A'} )`,
                      style: "Hyperlink",
                    }),
                  ],
                  link: process.env.NEXT_PUBLIC_APP_URL`/${language}/${doc._source.category.slug}/${doc._id}/${doc._source.slug}`,
                }),
              ],
            })
          ),
        },
      ],
    })

    // Salvează fișierul Word pe server
    const filePath = path.join(process.cwd(), 'public', `${startDate}-${endDate}.docx`);
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(filePath, buffer);

    // Răspunde cu locația fișierului
    return NextResponse.json({ downloadUrl: `/${startDate}-${endDate}.docx` });

  } catch (error) {
    console.error('Eroare în API:', error);
    return NextResponse.json({ error: 'A apărut o eroare' }, { status: 500 });
  }
}