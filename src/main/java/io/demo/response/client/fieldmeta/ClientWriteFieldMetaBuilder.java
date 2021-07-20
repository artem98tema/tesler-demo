package io.demo.response.client.fieldmeta;

import io.demo.model.enums.ClientImportance;
import io.demo.response.client.dto.ClientWriteDTO;
import io.demo.response.client.dto.ClientWriteDTO_;
import io.tesler.core.crudma.bc.impl.InnerBcDescription;
import io.tesler.core.dto.rowmeta.FieldsMeta;
import io.tesler.core.dto.rowmeta.RowDependentFieldsMeta;
import io.tesler.core.service.rowmeta.FieldMetaBuilder;
import org.springframework.stereotype.Service;

import java.util.Arrays;

import static io.demo.dictionary.DictionaryType.FIELD_OF_ACTIVITY;

@Service
public class ClientWriteFieldMetaBuilder extends FieldMetaBuilder<ClientWriteDTO> {
	@Override
	public void buildRowDependentMeta(RowDependentFieldsMeta<ClientWriteDTO> fields, InnerBcDescription bcDescription,
			Long id, Long parentId) {
		fields.setEnabled(
				ClientWriteDTO_.fullName,
				ClientWriteDTO_.city,
				ClientWriteDTO_.street,
				ClientWriteDTO_.building,
				ClientWriteDTO_.description,
				ClientWriteDTO_.importance,
				ClientWriteDTO_.fieldOfActivity
		);
		fields.setRequired(ClientWriteDTO_.fullName,
				ClientWriteDTO_.importance,
				ClientWriteDTO_.description,
				ClientWriteDTO_.city,
				ClientWriteDTO_.fieldOfActivity);
		fields.setDictionaryTypeWithCustomValues(ClientWriteDTO_.importance,
				Arrays.stream(ClientImportance.values()).map(ClientImportance::getImportance)
						.toArray(String[]::new)
		);

		fields.setDictionaryTypeWithAllValues(ClientWriteDTO_.fieldOfActivity, FIELD_OF_ACTIVITY);
	}

	@Override
	public void buildIndependentMeta(FieldsMeta<ClientWriteDTO> fields, InnerBcDescription bcDescription,
			Long parentId) {

	}
}
