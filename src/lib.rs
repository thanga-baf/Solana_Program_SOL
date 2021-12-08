#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        let result = 2 + 2;
        assert_eq!(result, 4);
    }
}

use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, msg, pubkey::Pubkey,
};

entrypoint!(process_instruction);
fn process_instruction(
    _program_id: &Pubkey,
    _accounts: &[AccountInfo],
    _instruction_data: &[u8],
) -> ProgramResult {

    let key: &u8 = _instruction_data.first().unwrap();

    match key {
        0 => msg!("its zero"),
        1 => msg!("its one"),
        _ => msg!("its error thanga !! {:?}",_instruction_data)
    }
    Ok(())
}