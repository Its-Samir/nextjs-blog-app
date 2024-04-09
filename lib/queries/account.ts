import { db } from "@/lib/db";
import { Account } from "@prisma/client";

export function getAccountByUserId(
	userId: string
): Promise<Pick<Account, "type"> | null> {
	return db.account.findFirst({ where: { userId }, select: { type: true } });
}
