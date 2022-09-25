package matthias.reactive_test.shops_reactive;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.util.UUID;

import static java.util.UUID.randomUUID;

@Getter
@Setter
@Table(name = "purchase_shop")
public class ShopEntity {

    @Id
    private UUID id = randomUUID();

    private String name;
}

