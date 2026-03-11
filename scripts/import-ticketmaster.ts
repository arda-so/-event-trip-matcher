import { importTicketmasterEvents } from "@/data/providers/ticketmaster/import";

function getArg(flag: string) {
  const index = process.argv.indexOf(flag);
  if (index === -1) return undefined;
  return process.argv[index + 1];
}

async function main() {
  const result = await importTicketmasterEvents({
    keyword: getArg("--keyword"),
    city: getArg("--city"),
    countryCode: getArg("--country"),
    classificationName: getArg("--classification") ?? "music",
    startDateTime: getArg("--start"),
    endDateTime: getArg("--end"),
    size: Number(getArg("--size") ?? "20")
  });

  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
